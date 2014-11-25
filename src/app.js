
var HelloWorldLayer = cc.Layer.extend({
	
	//wtf this is interesting
    sprite:null,
    ctor:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask the window size
        var size = cc.winSize;

        var background = cc.Sprite(res.background1_png);
        background.setAnchorPoint(cc.p(0,0));
        background.setPosition(cc.p(0,0));
        
        this.addChild(background);
        
        var zombieSprite = cc.Sprite(res.zombie1_png);
        zombieSprite.setAnchorPoint(cc.p(0.5,0.5));
        zombieSprite.setPosition(cc.p(400,400));
        zombieSprite._setWidth(zombieSprite._getWidth()/2);
        
        this.addChild(zombieSprite);
        
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


