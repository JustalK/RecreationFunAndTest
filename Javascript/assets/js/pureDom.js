// http://alistapart.com/article/making-your-javascript-pure

//function mouseOnLeftSide(mouseX) {
//    return mouseX < window.innerWidth / 2;
//}
//
//document.onmousemove = function(e) {
//    console.log(mouseOnLeftSide(e.pageX));
//};

const log = (x,c = console) => c.log(x)
const mouseOnLeftSide = (m, w) => m < w / 2
const windowWidth = (w) => w.innerWidth
const mousePositionX = (e) => e.clientX
const printResult = (w,e) => log(mouseOnLeftSide(mousePositionX(e),windowWidth(w)))
const addEventListener = (el,type,fn) => el.addEventListener(type,fn)
addEventListener(this,"click",printResult.bind(this,this))
// The line above is quite tricky because there are only one element send to printResult but two receive by it ;)
// Look the return of the event

