//menuResult에 들어갈 데이터, 추후 삭제 예정
export let menu = new Array();
let Item1 = new Object();
let Item2 = new Object();
let Item3 = new Object();
let Item4 = new Object();

Item1.name = '순두부찌개'
Item2.name = '된장찌개'
Item3.name = '김치찌개'
Item4.name = '비빔밥'

Item1.nonv = true
Item2.nonv = false
Item3.nonv = true
Item4.nonv = false

Item1.info = '계란, 해산물'
Item2.info = '멸치육수'
Item3.info = '해산물(김치-젓갈)'
Item4.info = '계란, 육류 '

menu.push(Item1);
menu.push(Item2);
menu.push(Item3);
menu.push(Item4);
