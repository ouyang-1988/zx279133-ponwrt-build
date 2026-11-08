'use strict';
'require view';
'require form';
'require uci';

return view.extend({
	load: function() {
		return uci.load('easytier');
	},

	render: function() {
		var m = new form.Map('easytier', 'EasyTier 配置',
			'修改后点击“保存并应用”，procd 会重启 easytier-core。日志级别只能走命令行，因此单独列在这里。');

		var s = m.section(form.NamedSection, 'main', 'easytier', '主实例');
		s.addremove = false;

		var o = s.option(form.Flag, 'enabled', '启用');
		o.rmempty = false;
		o.default = '1';

		o = s.option(form.Value, 'bin', '可执行文件');
		o.default = '/usr/bin/easytier-core';
		o.rmempty = false;

		o = s.option(form.Value, 'config_file', '配置文件');
		o.default = '/etc/easytier/config.toml';
		o.rmempty = false;
		o.description = '必须是 easytier-core -c 接受的 TOML。网络名、密码与 peer 都在这个文件里。';

		o = s.option(form.ListValue, 'log', '日志级别');
		o.value('error', 'error');
		o.value('warn', 'warn');
		o.value('info', 'info');
		o.value('debug', 'debug');
		o.value('trace', 'trace');
		o.default = 'warn';
		o.rmempty = false;

		o = s.option(form.Value, 'extra_args', '额外参数');
		o.rmempty = true;
		o.description = '原样追加到命令行末尾，例如 --no-listener。留空即可。';

		return m.render();
	}
});
