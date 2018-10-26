import Vue from 'vue'

Vue.prototype.$alert = (title,content,callback) => {
  let alert = parseDom(`
    <div class="weui-mask" id="weui-mask"></div>
    <div class="weui-dialog">
        <div class="weui-dialog__hd"><strong class="weui-dialog__title">${title}</strong></div>
        <div class="weui-dialog__bd">${content}</div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" id="weui-dialog__btn_primary" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
    </div>
  `)
  document.body.appendChild(alert)
  document.getElementById('weui-mask').addEventListener('click',()=>{
    document.body.removeChild(alert)
  })
  document.getElementById('weui-dialog__btn_primary').addEventListener('click',()=>{
    if(typeof callback === 'function'){
      callback()
    }
    document.body.removeChild(alert)
  })
}

function parseDom(template) {
  let tmp = document.createElement("div")
  tmp.innerHTML = template
  return tmp
}
