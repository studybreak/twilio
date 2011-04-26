var LTD = LTD || {};

LTD.Index = function() {
}

LTD.Index.prototype.get_deal = function() {
    $.ajax({
        type: "POST",
        url: '/getdeal',
        data: {phone: $('.twilio input').val()}
    });
}

$(document).ready(function(){
    var index = new LTD.Index();

    $('.btn_get_deal').click(index.get_deal);
});
