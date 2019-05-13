import Vue from "vue";

Vue.filter("DateDay", function(value) {
  let Day
  switch((new Date(value)).getDay()) {
    case 0:
      Day = "星期日"
      break
    case 1:
      Day = "星期一"
      break
    case 2:
      Day = "星期二"
      break
    case 3:
      Day = "星期三"
      break
    case 4:
      Day = "星期四"
      break
    case 5:
      Day = "星期五"
      break
    case 6:
      Day = "星期六"
      break
  }
  return `${format(value, "yyyy-MM-dd")} ${Day}`
});
Vue.filter("DateDay2", function(value) {
  return `${format(value, "yyyy-MM-dd")}`
});
Vue.filter("OS", function(value) {
  switch(value + '') {
    case '1':
      return "Windows 10"
    case '2':
      return "Windows 8"
    case '3':
      return "Windows 7"
  }
});

Vue.filter("infoStatus", function(value) {
  switch(value + '') {
    case '0':
      return "等待审核"
    case '1':
      return "审核成功"
    case '2':
      return "审核失败"
    case '3':
      return "安装成功"
    case '4':
      return "安装失败"
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
