let middleware = [];
middleware.push((next) => {
  console.log(1)
  next?.();
  console.log(1.1)
})
middleware.push((next) => {
  console.log(2)
  next?.();
  console.log(2.1)
})
middleware.push((next) => {
  console.log(3)
  next?.();
  console.log(3.1)
})
function compose(middlewares) {
  // return () => middlewares[0](() => middleware[1](() => middleware[2]()))
  return () => {
    function dispatch(i) {
      const next = i + 1 === middlewares.length ? () => void 0 : () => dispatch(i+1);
      middlewares[i](next)
    }
    dispatch(0)
  }
}

compose(middleware)()