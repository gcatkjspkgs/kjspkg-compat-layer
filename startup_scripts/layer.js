global.kjspkgCompatLayer = {};

if (typeof StartupEvents != "undefined") {
    let links = {
        "init": StartupEvents.init,
        "postinit": StartupEvents.postInit,

        "command.registry": ServerEvents.commandRegistry,
        "command.run": ServerEvents.command,

        "client.init": ClientEvents.init,
        "client.debug_info.left": ClientEvents.leftDebugInfo,
        "client.debug_info.right": ClientEvents.rightDebugInfo,
        "client.generate_assets": ClientEvents.highPriorityAssets,
        "client.logged_in": ClientEvents.loggedIn,
        "client.logged_out": ClientEvents.loggedOut,
        "client.tick": ClientEvents.tick,

        "server.load": ServerEvents.loaded,
        "server.unload": ServerEvents.unloaded,
        "server.tick": ServerEvents.tick,
        "server.datapack.first": ServerEvents.highPriorityData,
        "server.datapack.last": ServerEvents.lowPriorityData,

        "recipes": ServerEvents.recipes,
        "recipes.after_load": ServerEvents.afterRecipes,

        "level.load": LevelEvents.loaded,
        "level.unload": LevelEvents.unloaded,
        "level.tick": LevelEvents.tick,
        "level.exploasion.pre": LevelEvents.beforeExplosion,
        "level.exploasion.post": LevelEvents.afterExplosion,

        "player.logged_in": PlayerEvents.loggedIn,
        "player.logged_out": PlayerEvents.loggedOut,
        "player.tick": PlayerEvents.tick,
        "player.chat": PlayerEvents.chat,
        "player.advancement": PlayerEvents.advancement,
        "player.inventory.opened": PlayerEvents.inventoryOpened,
        "player.inventory.closed": PlayerEvents.inventoryClosed,
        "player.inventory.changed": PlayerEvents.inventoryChanged,
        "player.chest.opened": PlayerEvents.chestOpened,
        "player.chest.closed": PlayerEvents.chestClosed,

        "entity.death": EntityEvents.death,
        "entity.attack": EntityEvents.hurt,
        "entity.drops": EntityEvents.drops,
        "entity.check_spawn": EntityEvents.checkSpawn,
        "entity.spawned": EntityEvents.spawned,

        "block.registry": callback => StartupEvents.registry("block", callback),
        "block.tags": callback => ServerEvents.tags("block", callback),
        "block.right_click": BlockEvents.rightClicked,
        "block.left_click": BlockEvents.leftClicked,
        "block.left_click": BlockEvents.leftClicked,
        "block.place": BlockEvents.placed,
        "block.break": BlockEvents.broken,
        "block.modification": BlockEvents.modification,

        "item.registry": callback => StartupEvents.registry("item", callback),
        "item.tags": callback => ServerEvents.tags("item", callback),
        "item.right_click": ItemEvents.rightClicked,
        "item.left_click": ItemEvents.firstLeftClicked,
        "item.entity_interact": ItemEvents.entityInteracted,
        "item.modification": ItemEvents.modification,
        "item.pickup": ItemEvents.pickedUp,
        "item.tooltip": ItemEvents.tooltip,
        "item.toss": ItemEvents.dropped,
        "item.crafted": ItemEvents.crafted,
        "item.smelted": ItemEvents.smelted,

        "fluid.registry": callback => StartupEvents.registry("fluid", callback),
        "fluid.tags": callback => ServerEvents.tags("fluid", callback),

        "entity_type.tags": callback => ServerEvents.tags("entity_type", callback),

        "jei.subtypes": JEIEvents.subtypes,
        "jei.hide.items": JEIEvents.hideItems,
        "jei.hide.fluids": JEIEvents.hideFluids,
        "jei.add.items": JEIEvents.addItems,
        "jei.add.fluids": JEIEvents.hideFluids,
        "jei.information": JEIEvents.information,

        "rei.hide.items": callback => REIEvents.hide("item", callback),
        "rei.add.items": callback => REIEvents.add("item", callback),
        "rei.information": REIEvents.information,
        "rei.remove.categories": REIEvents.removeCategories,
        "rei.group": REIEvents.groupEntries,
    };

    global.kjspkgCompatLayer.legacyOnEvent = (event, callback) => {
        if (!Object.keys(links).includes(event)) return;
        return links[event](callback);
    };
} else {
    global.kjspkgCompatLayer.legacyOnEvent = (event, callback) => {
        if (typeof Component == "undefined")
            event = event.replace("level", "world");
        return onEvent(event, callback);
    };
}