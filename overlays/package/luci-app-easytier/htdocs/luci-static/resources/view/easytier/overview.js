'use strict';
'require view';
'require rpc';
'require uci';
'require ui';

var callStatus = rpc.declare({ object: 'luci.easytier', method: 'status', expect: {} });
var callInfo = rpc.declare({ object: 'luci.easytier', method: 'info', expect: {} });
var callServiceList = rpc.declare({ object: 'service', method: 'list', params: ['name'], expect: { '': {} } });

function serviceRunning(section) {
	return callServiceList('easytier').then(function(reply) {
		var inst = reply && reply.easytier && reply.easytier.instances;
		if (!inst) return false;
		for (var k in inst) if (inst[k].running) return true;
		return false;
	}).catch(function() { return false; });
}

function row(label, value, cls) {
	return E('div', { 'class': 'tr cbi-rowstyle-1' }, [
		E('div', { 'class': 'td left', 'style': 'width:34%' }, label),
		E('div', { 'class': 'td left' + (cls ? ' ' + cls : '') }, value)
	]);
}

function badge(ok, textOk, textBad) {
	return E('span', {
		'class': 'label ' + (ok ? 'success' : 'danger')
	}, [ ok ? textOk : textBad ]);
}

return view.extend({
	load: function() {
		return Promise.all([ callStatus(), callInfo(), serviceRunning(), uci.load('easytier') ]);
	},

	render: function(data) {
		var status = data[0] || {}, info = data[1] || {}, running = data[2];

		var tunOk = status.tun === true;
		var cfgOk = status.config_present === true;

		var peers = (info.peers || []).map(function(uri) {
			return E('li', {}, [ E('code', {}, [ uri ]) ]);
		});

		return E('div', { 'class': 'cbi-map' }, [
			E('h2', {}, [ 'EasyTier 组网' ]),
			E('div', { 'class': 'cbi-map-descr' }, [
				'本页只显示内核与进程实际报告的状态。服务名 easytier 由 procd 监管；',
				'隧道是否可用取决于 /dev/net/tun 是否由内核导出。'
			]),

			E('div', { 'class': 'cbi-section' }, [
				E('h3', {}, [ '运行状态' ]),
				E('div', { 'class': 'table' }, [
					row('服务', badge(running, '运行中', '已停止')),
					row('进程', status.running ? ('PID ' + status.pid) : '无'),
					row('TUN 设备', badge(tunOk, '内核已导出', '不可用')),
					row('配置文件', badge(cfgOk, '/etc/easytier/config.toml', '缺失')),
					row('网络名', info.network_name || '未配置'),
					row('本机名', info.hostname || '未配置')
				])
			]),

			E('div', { 'class': 'cbi-section' }, [
				E('h3', {}, [ 'Peer' ]),
				peers.length ? E('ul', {}, peers) : E('p', { 'class': 'cbi-value-description' }, [ '没有配置 peer。' ])
			]),

			E('div', { 'class': 'cbi-page-actions' }, [
				E('button', {
					'class': 'btn cbi-button cbi-button-action',
					'click': ui.createHandlerFn(this, function() {
						// Re-read only. Starting or restarting a tunnel is a
						// configuration change and belongs on the config page,
						// where procd is told to reload the service.
						window.location.reload();
					})
				}, [ '刷新状态' ])
			])
		]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
