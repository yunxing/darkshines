function GAME(div_name){
    if (!div_name) return;

    if (window == this) {
        return new GAME(div_name);
    }

    var canvas_name = div_name;

    //init local modules
    var graphic;
    var physic;
    var player;
    var game_events;
    var render_events;
    var bg;
    var keyboard;

    this.init = function() {
        events = new EVENTS(60);
        graphic = new GRAPHIC(canvas_name);
        physic = new PHYSIC();
        physic.init();

        keyboard = new KEYBOARD();
        keyboard.init();
        //load resources
        TEXTURE.load_images(CONFIG.PATH_TO.PICS, CONFIG.TEXTURES_FILES,
                            resources_loading_complete);

    };

    var resources_loading_complete = function() {
        if (TEXTURE.is_finished) {
            load_environment();
        }
    };

    var load_environment = function() {
        player = new PLAYER();
        player.create({x:0, y:0}, graphic.create_body,
                      physic.create_body, 0xffff00);

        player2 = new PLAYER();
        player2.create({x:10, y:10}, graphic.create_body,
                       physic.create_body, 0x00ffff);

        bg = new BACKGROUDN(graphic.create_body);
        bg.create();

        physic.register(player.gen_physic_update(keyboard.get_move_keys));
        physic.register(player2.gen_physic_update(function(){return {}}));

        graphic.register(player.graphic_update);
        graphic.register(player2.graphic_update);

        events.register(physic.gen_update(events.get_delta_time));
        events.register(graphic.gen_camera_reset_event(player.get_pos));
        events.register(graphic.update);
        events.start();
    };
}
