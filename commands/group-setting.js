const {
    isNotAdmin,
    isNotAdminOf
} = require('../handler.js');
const {
    bold,
    monospace
} = require('@mengkodingan/ckptw');

module.exports = {
    name: 'group',
    category: 'group',
    code: async (ctx) => {
        const input = ctx._args.join(' ');

        if (!input) return ctx.reply(
            `${global.msg.argument} Argumen yang tersedia adalah open dan close.\n` +
            `Contoh: ${monospace(`${ctx._used.prefix + ctx._used.command} close`)}`
        );

        if (isNotAdmin(ctx)) return ctx.reply(global.msg.admin);

        if (isNotAdminOf(ctx)) return ctx.reply(global.msg.botAdmin);

        if (!ctx.isGroup()) return ctx.reply(global.msg.group);

        try {
            const isClose = {
                'open': false,
                'close': true
            } [(input || '')]

            if (isClose === undefined) return ctx.reply(`${bold('[ ! ]')} Argumen yang tersedia adalah open dan close.`);

            await ctx._client.groupSettingUpdate(ctx.id, isClose);

            return ctx.reply(`${bold('[ ! ]')} Berhasil mengubah setelan grup!`);
        } catch (error) {
            console.error('Error:', error);
            return ctx.reply(`${bold('[ ! ]')} Terjadi kesalahan: ${error.message}`);
        }
    }
};