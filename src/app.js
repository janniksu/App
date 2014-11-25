var moveZombiePerSeconds = 600;
var moveDT = 0.0;
var lastUpdateTime = 0.0;
var zombieSprite;
var velocity = cc.p(0,0);

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
        
        zombieSprite = cc.Sprite(res.zombie1_png);
        zombieSprite.setAnchorPoint(cc.p(0.5,0.5));
        zombieSprite.setPosition(cc.p(400,400));
        zombieSprite.scheduleUpdate();
     
        
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
        				
        				
        				var touchLocation = cc.p(event.getLocationX(),event.getLocationY());
        				moveZombieTowards(touchLocation);
        			}
        		}
        			
        		},this);
        	}
        }
        
    },
    
 
    
   
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
        this.scheduleUpdate();
    },
    
    
    	update: function (dt) {
    		
    		moveDT = dt;
    		
    		
    		moveSprite(zombieSprite, velocity);
    		checkBoundsZombie();
    		
    		if (this._componentContainer && !this._componentContainer.isEmpty())
    			this._componentContainer.visit(dt);
    		
    		
    	}
    

	
});

function moveSprite(sprite, velocityX){
	var amountToMove = cc.p(velocityX.x*moveDT,velocityX.y*moveDT);
	
	sprite.setPosition ( cc.p(sprite.getPosition().x + amountToMove.x, sprite.getPosition().y + amountToMove.y));
}


function moveZombieTowards(point){
	var offset = cc.p(point.x-zombieSprite.getPosition().x,point.y-zombieSprite.getPosition().y);
	
	var length = Math.sqrt(offset.x*offset.x + offset.y * offset.y);
	cc.log("length " + length);
	var direction = cc.p(offset.x/length,offset.y/length);
	
	velocity = cc.p(direction.x*moveZombiePerSeconds,direction.y * moveZombiePerSeconds);
}

function checkBoundsZombie(){
	var bottomLeft = cc.p(0,0);
	var topRight = cc.p(cc.winSize.width,cc.winSize.height);
	
	if(zombieSprite.getPositionX() <= bottomLeft.x){
		zombieSprite.setPositionX(bottomLeft.x);
		velocity.x = -velocity.x;
	}
	
	if(zombieSprite.getPositionX()>=topRight.x){
		zombieSprite.setPositionX(topRight.x);
		velocity.x = -velocity.x;
	}
	
	if (zombieSprite.getPositionY() <= bottomLeft.y) { 
		zombieSprite.setPositionY(bottomLeft.y);
		velocity.y = -velocity.y
	}
	
	if (zombieSprite.getPositionY() >= topRight.y) { 
		zombieSprite.setPositionY(topRight.y);
		velocity.y = -velocity.y
	}
}

