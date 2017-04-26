$(function () {
	var view = 1;
    
    reqApi({
		code: '802503',
		json: {
			userId: getUserId()
		}
	}).done(function(data) {
		$("#amount-CNY").text("￥"+data[0].amount/1000)
		$("#amount-CGB").text(data[2].amount/1000+"菜狗币")
		$("#amount-JF").text(data[1].amount/1000+"积分")
	});
    
    $("#CNYls-Btn").click(function(){
		location.href="../store/ledger.html?currency=CNY";
	})
	$("#CGBls-Btn").click(function(){
		location.href="../store/ledger.html?currency=CGB";
	})
	$("#CGJFls-Btn").click(function(){
		location.href="../store/ledger.html?currency=CGJF";
	})
    
     $('#accoutSaleBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				field: 'toUserId',
				title: '售卖加盟商',
				required: true,
				type: 'select',
				pageCode: 805054,
				params: {
					kind: '05',
					updater:''
				},
				keyName: 'userId',
				valueName: 'mobile',
				searchName: 'mobile',
			},{
				title: '数量',
				field: 'amount',
				amount: true,
				"Z+": true,
				formatter:moneyFormat,
				required: true
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '售卖',
				handler: function() {
					
					if($('#toUserId').val()==""){
						toastr.error("售卖用户不能为空");
					}else if($('#amount').val()==""){
						toastr.error("数量不能为空");
					}else if ($('#popForm').valid()) {
						
						var data = $('#popForm').serializeObject();
						data.fromUserId = getUserId();
						data.currency = "CGB";
						reqApi({
							code: '802401',
							json: data
						}).done(function(data) {
							location.reload();
							dw.close().remove();
						});
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});
		dw.__center();
	});
	
	$('#accoutGrantBtn').click(function() {
		var selRecords = $('#tableList').bootstrapTable('getSelections');
		var dw = dialog({
			content: '<form class="pop-form" id="popForm" novalidate="novalidate">' +
			'<ul class="form-info" id="formContainer"></ul>'+
			'</form>'
		});
		
		dw.showModal();
		buildDetail({
			fields: [{
				title: '发放加盟商',
				field: 'toUserId',
				type:'select',
				pageCode: 805054,
				params: {
					kind: '05',
					updater:''
				},
				keyName: 'userId',
				valueName: 'mobile',
				searchName: 'mobile',
				required: true
			},{
				title: '数量',
				field: 'amount',
				amount: true,
				"Z+": true,
				formatter:moneyFormat,
				required: true
			}],
			container: $('#formContainer'),
			buttons: [{
				title: '发放',
				handler: function() {
					if ($('#popForm').valid()) {
						
						var data = $('#popForm').serializeObject();
						data.fromUserId = getUserId();
						data.currency = "CGJF";
						reqApi({
							code: '802401',
							json: data
						}).done(function(data) {
							location.reload();
							dw.close().remove();
						});
					}
				}
			}, {
				title: '取消',
				handler: function() {
					dw.close().remove();
				}
			}]
		});
		dw.__center();
	});
    
    
});