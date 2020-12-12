
class Player
  def play_turn(w)
    # cool code goes here
    @health=20 if nil==@health
    @in_battle=(w.health < @health) || w.feel.enemy?

    if @in_battle
      @r=battle(w)
    else
      @r=dmz(w)
    end

    w.walk! if nil==@r
    @health = w.health
  end

  def battle(w)
#    if w.health <= 6
#      return w.walk!(:backward)
#    end
    if w.feel.enemy?
      return w.attack!
    end
    return nil
  end

  def dmz(w)
    if w.health < 20
      return w.rest! 
    end
    return nil
  end
end