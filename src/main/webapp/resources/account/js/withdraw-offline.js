$(function() {
	//按钮权限判断
	showPermissionControl();
	//页面数据字典初始化
	var status_data = Dict.getName('withdraw_status');
	$("#status").renderDropdown(objectArrayFilter(status_data, '1,3'));
	
	// 表格初始化
	queryTableData();
	// 查询事件绑定
	$('#searchBtn').click(function() {
		$('#tableList').bootstrapTable('refresh',{url: $("#basePath").val()+"/account/withdrawOrderPage"});
	});
	
	$('#checkBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "1"){
			alert("该订单状态不是待审批状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/withdraw_offline_approve.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber;
	});
	
	// 支付事件绑定
	$('#payBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections')
		if(selRecords.length <= 0){
			alert("请选择记录");
			return;
		}
		if(selRecords[0].status != "3"){
			alert("该订单状态不是审批通过-待支付状态");
			return;
		}
		location.href = $("#basePath").val()+"/account/withdraw_offline_pay.htm?code="+selRecords[0].code+"&accountNumber="+selRecords[0].accountNumber;
	});
});

//表格初始化
function queryTableData(){
	// 绑定列表
	$('#tableList').bootstrapTable({
		method : "get",
		url : $("#basePath").val()+"/account/withdrawOrderPage",
		
		striped : true,
		clickToSelect : true,
		singleSelect : true,
		queryParams : function(params) {
			return {
				currency: 'CNY',
				accountNumber: '',
				status : $("#status").val() || '13',
				mobile: $('#mobile').val(),
				dateStart : $("#startDate").val(),
				dateEnd : $("#startDate").val(),
				start : params.offset / params.limit + 1,
				limit : params.limit
			};
		},
		queryParamsType : 'limit',
		responseHandler : function(res) {
			return {
				rows : res.data.list,
				total : res.data.totalCount
			};
		},
		pagination : true,
		sidePagination : 'server', // 服务端请求
		totalRows : 0,
		pageNumber : 1,
		pageSize : 10,
		pageList : [ 10, 20, 30, 40, 50 ],
		columns : [{
			field : '',
			title : '',
			align : 'left',
			valign : 'middle',
			checkbox : true
		},{
			field : 'code',
			title : '订单编号'
		},{
			field : 'mobile',
			title : '手机号'
		},{
			field : 'amount',
			title : '取现金额',
			formatter : moneyFormatter
		},{
			field : 'status',
			title : '状态',
			align : 'left',
			valign : 'middle',
			sortable : false,
			formatter : Dict.getNameForList('withdraw_status')
		},{
			field : 'createDatetime',
			title : '申请时间',
			formatter : dateFormatter
		},{
			field : 'approveUser',
			title : '审批人'
		},{
			field : 'approveDatetime',
			title : '审批时间',
			formatter : dateFormatter
		}]
	});
}

//格式化金额
function moneyFormatter(value, row){
	return moneyFormat(value, 2);
}
//格式化时间
function dateFormatter(value, row){
	return dateFormat(value,'yyyy-MM-dd HH:mm:ss');
}