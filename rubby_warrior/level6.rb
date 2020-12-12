
class Player
  def play_turn(mi)
    # cool code goes here
    @dir=:backward if nil==@dir
    @health=20 if nil==@health
    @in_battle=(mi.health < @health);
    
    #on battle!
    if @in_battle
      #enemy next to mi
      if mi.feel(@dir).enemy?
        mi.attack!(@dir)
        @health = mi.health
        return 0
      end
      #damaged not to battle
      if mi.health < 10
        mi.walk!(:backward)
        @health = mi.health
        return 0
      end
    else
      # rest 1st
      if mi.health < 20
        mi.rest!
        @health = mi.health
        return 0
      end
      # is captive near
      if mi.feel(@dir).captive?
        mi.rescue!(@dir)
        @dir=:forward
        @health = mi.health
        return 0
      end
    end
    mi.walk!(@dir)
  end
end
