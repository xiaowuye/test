import { Dialog, Util, Config, Storge } from './libs/test/WebCore';
import FLUX from './libs/flux';

$(function () {

  FLUX.actions.testMock((result) => {
    $("#name").html(result.name);
    $("#mobile").html(result.mobile);
  }, (result, errCode) => {
    Dialog.alert('抱歉，数据出现问题，请稍等一哈');
  });
  $("#button").click(function () {
    if (!Util.isContent($("#name").html())) {
      Dialog.alert('少名字了', function () { });
      return false;
    }
    if (!Util.isContent($("#mobile").html())) {
      Dialog.alert('少电话号码了', function () { });
      return false;
    }
    Dialog.alert('你成功啦!', function () { });
  })
});