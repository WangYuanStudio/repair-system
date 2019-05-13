import Vue from 'vue'

const isAndroid = /Android/.test(navigator.userAgent)

Vue.prototype.$alert = ({ title,content,callback }) => {
  //title可选
  let maskid = `maskid_${(new Date()).valueOf()}`
  let btnid = `weui-dialog__btn_primary_${(new Date()).valueOf()}`
  let alert =  parseDom(`
    <div class="weui-mask" id="${maskid}"></div>
    <div class="weui-dialog ${isAndroid?'weui-skin_android':''}">
        ${title?`<div class="weui-dialog__hd"><strong class="weui-dialog__title">${title}</strong></div>`:""}
        <div class="weui-dialog__bd">${content}</div>
        <div class="weui-dialog__ft">
            <a href="javascript:;" id="${btnid}" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
        </div>
    </div>
  `)
  document.body.appendChild(alert)
  document.getElementById(maskid).addEventListener('click',()=>{
    document.body.removeChild(alert)
  })
  document.getElementById(btnid).addEventListener('click',()=>{
    if(typeof callback === 'function'){
      callback()
    }
    document.body.removeChild(alert)
  })
}

Vue.prototype.$toast = ({title,time}) => {
  let toast = parseDom(`
    <div id="toast">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">${title}</p>
        </div>
    </div>
  `)
  time = time?time:1000
  document.body.appendChild(toast)
  setTimeout(()=>{
    document.body.removeChild(toast)
  },time)
}

Vue.prototype.$loadingToast = ({title}) => {
  let loadingToast = parseDom(`
    <div id="loadingToast">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-loading weui-icon_toast"></i>
            <p class="weui-toast__content">${title}</p>
        </div>
    </div>
  `)
  document.body.appendChild(loadingToast)
  return function(){
    document.body.removeChild(loadingToast)
  }
}

Vue.prototype.$confirm = ({title,content,callback}) => {
  let yesid = `weui_confirm_yes_${(new Date()).valueOf()}`
  let noid = `weui_confirm_no_${(new Date()).valueOf()}`
  let confirm = parseDom(`
  <div id="dialog1">
    <div class="weui-mask"></div>
    <div class="weui-dialog ${isAndroid?'weui-skin_android':''}">
        ${title?`<div class="weui-dialog__hd"><strong class="weui-dialog__title">${title}</strong></div>`:''}
        <div class="weui-dialog__bd">${content}</div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" id="${noid}" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
          <a href="javascript:;" id="${yesid}" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
        </div>
    </div>
  </div>
  `)
  document.body.appendChild(confirm)
  document.getElementById(yesid).addEventListener('click',()=>{
    document.body.removeChild(confirm)
    callback(true)
  })
  document.getElementById(noid).addEventListener('click',()=>{
    document.body.removeChild(confirm)
    callback(false)
  })
}
Vue.prototype.$input = ({title,callback}) => {
  let yesid = `weui_confirm_yes_${(new Date()).valueOf()}`
  let noid = `weui_confirm_no_${(new Date()).valueOf()}`
  let confirm = parseDom(`
  <div id="dialog2">
    <div class="weui-mask"></div>
    <div class="weui-dialog ${isAndroid?'weui-skin_android':''}">
        ${title?`<div class="weui-dialog__hd"><strong class="weui-dialog__title">${title}</strong></div>`:''}
        <div class="weui-dialog__bd"><textarea style="resize:none;outline:none;padding:5px;width:100%;" id="weui_input" rows="3"></textarea></div>
        <div class="weui-dialog__ft">
          <a href="javascript:;" id="${noid}" class="weui-dialog__btn weui-dialog__btn_default">取消</a>
          <a href="javascript:;" id="${yesid}" class="weui-dialog__btn weui-dialog__btn_primary">确认</a>
        </div>
    </div>
  </div>
  `)
  document.body.appendChild(confirm)
  document.getElementById(yesid).addEventListener('click',()=>{
    callback(true,document.getElementById('weui_input').value)
    document.body.removeChild(confirm)
  })
  document.getElementById(noid).addEventListener('click',()=>{
    document.body.removeChild(confirm)
    callback(false)
  })
}

function parseDom(template) {
  let tmp = document.createElement("div")
  tmp.innerHTML = template
  return tmp
}
