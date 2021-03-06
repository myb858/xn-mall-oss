$(function() {
    var code = getQueryString('code');
    var view = getQueryString('v');

    var fields = [{
        title: '活动',
        field: 'title',
        readonly: view,
    }, {
        title:"购买金额",
        field:"czAmount",
        amount:true,
        required: true,
        formattter:moneyFormat,
        help:"客户用于购买活动的真实人民币金额数"
    },{
        title: '活动资金',
        field: 'amount',
        amount: true,
        required: true,
        readonly: view,
        help:"是客户购买的虚拟的活动资金数"
    },{
        title: '备注',
        field: 'remark',
        maxlength: 250,
        readonly: view
    }, {
        field: "addUser",
        value: getUserId(),
        type: "hidden",
        required: true
    }];

    buildDetail({
        fields: fields,
        code: code,
        view: view,
        detailCode: '801136',
        addCode: "801130",
        editCode: '801131'
    });
});