
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
        
        var move_action2 = cc.MoveTo.create(2,cc.p(800,800));
        zombieSprite.runAction(move_action2);
        
        if(cc.sys.capabilities.hasOwnProperty('touches')){
        	cc.eventManager.addListener({
        		event: cc.EventListener.TOUCH_ONE_BY_ONE,
        		
        		onTouchBegan:function(touch,event)
        		{
        			
        			
        			
        		},
        		
        		onTouchMoved:function(touch, event){
        			
        		},
        		
        		onTouchEnded:function(touch,event){
        			var touchLocation = cc.p(touch.getLocationX(),touch.getLocationY());
        			var move_action = cc.MoveTo.create(2,touchLocation);
        			zombieSprite.runAction(move_action);
        			return true;
        		}
        	},this);
        }
        else{
        	if(cc.sys.capabilities.hasOwnProperty('mouse')){
        		cc.eventManager.addListener({
        			event: cc.EventListener.MOUSE,
        			
        		onMouseUp: function(event){
        			if(event.getButton() == cc.EventMouse.BUTTON_LEFT){
        				cc.log(event.getLocationX());
        				cc.log(event.getLocationY());
        				var touchLocation = cc.p(event.getLocationX(),event.getLocationY());
        				var move_action = cc.MoveTo.create(2,touchLocation);
        				move_action._speed = 2;
        				zombieSprite.runAction(move_action);
        			}
        		}
        			
        		},this);
        	}
        }
        
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});


