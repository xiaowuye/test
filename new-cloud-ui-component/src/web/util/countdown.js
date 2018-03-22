var demo = function (max, prepare_callback, start_callback, process_callback, end_callback) {
    max = parseInt(max);
    this.max = max;
    this.now = max;
    this.callback = {
        prepare: prepare_callback,
        start: start_callback,
        process: process_callback,
        end: end_callback,
    };
    this.interval = 0;
};
demo.prototype = {
    prepare: function (jq_id) {
        var self = this;
        self.callback["prepare"](jq_id);
    },
    dida: function (jq_id) {
        var self = this;
        self.callback["process"](self.now, jq_id);
        self.now--;
        if (self.now <= 0) {
            self.stop();
            self.callback["end"](jq_id);
        }
    },
    start: function (jq_id, max) {
        var self = this;
        self.now = self.max;
        if (max != undefined) {
            self.now = parseInt(max);
        }
        self.callback["start"](jq_id);
        self.stop();
        self.dida(jq_id);
        self.interval = setInterval(function () {
            self.dida(jq_id);
        }, 1000);
    },
    stop: function () {
        var self = this;
        if (self.interval > 0) {
            clearInterval(self.interval);
        }
    }
}
;
export default demo;