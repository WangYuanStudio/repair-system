import Vue from "vue";

Vue.filter("date", function(value) {
  return format(value, "yyyy-MM-dd");
});

Vue.filter("Day", function(value) {
  switch(value) {
    case 0:
      return "星期日"
    case 1:
      return "星期一"
    case 2:
      return "星期二"
    case 3:
      return "星期三"
    case 4:
      return "星期四"
    case 5:
      return "星期五"
    case 6:
      return "星期六"
  }
});

function format(time, format) {
  let t = new Date(time); // format(time, 'yyyy/MM/dd HH:mm:ss');
  let tf = function(i) {
    return (i < 10 ? "0" : "") + i;
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear());
      case "MM":
        return tf(t.getMonth() + 1);
      case "mm":
        return tf(t.getMinutes());
      case "dd":
        return tf(t.getDate());
      case "HH":
        return tf(t.getHours());
      case "ss":
        return tf(t.getSeconds());
    }
  });
}
