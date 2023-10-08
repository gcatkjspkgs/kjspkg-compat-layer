//priority: 10000

global.kjspkgCompatLayer = {}

if (typeof StartupEvents != "undefined") {
    let emptyfunc = callback => {}

    let jeiloaded = Platform.isLoaded("jei")
    let reiloaded = Platform.isLoaded("roughlyenoughitems")

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

        "generic.loot_tables": ServerEvents.genericLootTables,
        "block.loot_tables": ServerEvents.blockLootTables,
        "entity.loot_tables": ServerEvents.entityLootTables,
        "gift.loot_tables": ServerEvents.giftLootTables,
        "fishing.loot_tables": ServerEvents.fishingLootTables,
        "chest.loot_tables": ServerEvents.chestLootTables,

        "jei.subtypes": jeiloaded ? JEIEvents.subtypes : emptyfunc,
        "jei.hide.items": jeiloaded ? JEIEvents.hideItems : emptyfunc,
        "jei.hide.fluids": jeiloaded ? JEIEvents.hideFluids : emptyfunc,
        "jei.add.items": jeiloaded ? JEIEvents.addItems : emptyfunc,
        "jei.add.fluids": jeiloaded ? JEIEvents.hideFluids : emptyfunc,
        "jei.information": jeiloaded ? JEIEvents.information : emptyfunc,

        "rei.hide.items": reiloaded ? callback => REIEvents.hide("item", callback) : emptyfunc,
        "rei.add.items": reiloaded ? callback => REIEvents.add("item", callback) : emptyfunc,
        "rei.information": reiloaded ? REIEvents.information : emptyfunc,
        "rei.remove.categories": reiloaded ? REIEvents.removeCategories : emptyfunc,
        "rei.group": reiloaded ? REIEvents.groupEntries : emptyfunc,
    }

    global.kjspkgCompatLayer.versionId = Platform.getMcVersion().startsWith("1.19") ? 9 : 10

    global.kjspkgCompatLayer.legacyOnEvent = (event, callback) => {
        if (!Object.keys(links).includes(event)) return
        return links[event](callback)
    }
    global.kjspkgCompatLayer.legacyJava = classname => Java.loadClass(classname)
    global.kjspkgCompatLayer.legacyForgeEvent = (event, callback) => ForgeEvents.onEvent(event, callback)
} else {
    global.kjspkgCompatLayer.versionId = typeof Component == "undefined" ? 6 : 8

    global.kjspkgCompatLayer.legacyOnEvent = (event, callback) => {
        if (global.kjspkgCompatLayer.versionId==6) event = event.replace("level", "world")
        return onEvent(event, callback)
    }
    global.kjspkgCompatLayer.legacyJava = classname => Java(classname)
    global.kjspkgCompatLayer.legacyForgeEvent = (event, callback) => {
        if (global.kjspkgCompatLayer.versionId==6) return
        return onForgeEvent(event, callback)
    }
}