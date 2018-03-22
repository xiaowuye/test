import JsonResult from './test/JsonResult';
import Config from './test/WebCore';

const flux = {};
flux.actions = {
  testMock(successHandler, errorHandler, completeHandler) {
    $.ajax({
      async: true,
      url: Config.Config.data + "/api/test?" + new Date().getTime(),
      type: "POST",
      dataType: 'json',
      data: {},
      timeout: 500000,
      success: (resp) => JsonResult.value(resp, successHandler, errorHandler),
      error: (resp) => JsonResult.value(resp, successHandler, errorHandler),
      complete: completeHandler,
    });
  }
};
export default flux;