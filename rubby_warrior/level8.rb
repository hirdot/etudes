
class Player
  def play_turn(w)
    # cool code goes here
    @dir=:forward if nil==@dir
    @health=20 if nil==@health
    @in_battle=(w.health < @health) || w.feel.enemy?
    @r=nil

    if w.feel(@dir).wall?
      w.pivot!
      return 0
    end

    if @in_battle
      if w.feel.enemy?
        @r=w.attack!(@dir)
      else
        if w.health < 10
          @r=w.walk!(:backward)
        end
      end
    else
      if w.health < 20
        @r=w.rest!
      end
      if w.feel(@dir).captive?
        @r=w.rescue!(@dir)
        @dir=:forward
      end
    end

    w.walk!(@dir) if nil==@r
    @health = w.health
  end

end