;; -----------------------------------------------------------
;; 第7章  練習問題 1
;; 2011.04.19
;; -----------------------------------------------------------
; リストの要素数を数える関数my-length
(define (my-length ls)
    (if (null? ls)
        0
        (+ 1 (my-length (cdr ls)))))

; リストの要素数の合計値を返す関数lenSum
(define (lenSum ls)
    (if (null? ls)
        0
        (+ (car ls) (lenSum (cdr ls)))))


; リスト (ls) から要素 (x) を取り除いたリストを返す関数。
(define (ls-x ls x)
  (if (null? ls) 
      '()
      (if (or (eqv? (car ls) x) (equal? (car ls) x))
          (cdr ls)
          (cons (car ls) (ls-x (cdr ls) x)))))


; リスト (ls) の要素 (x) の位置を返す関数
;; 位置は 0 から数え始め、 x がない場合は #f を返す
(define (ls-pos ls x)
    (if (null? ls)
        #f
        (if (or (eqv? (car ls) x) (equal? (car ls) x))
            0
            (let ((tmp (ls-pos (cdr ls) x)))
                 (if (and tmp)
                     (+ 1 tmp)
                     tmp)))))


;; -----------------------------------------------------------
;; 第7章  練習問題 2 （末尾再帰関数の練習）
;; 2011.04.19
;; -----------------------------------------------------------
;1.リストの要素の順番を反転させる関数 my-reverse
;(ちなみに reverse という関数があらかじめ定義されています)
(define (ls-rev ls)
    (ls-rec ls '()))
(define (ls-rec ls lsm)
    (if (null? ls)
        lsm
        (let ((m (car ls)))
             (ls-rec (cdr ls) (if (null? lsm)
                                  (cons m '())
                                  (cons m lsm))))))

;2.数のリストの要素の合計を求める関数
(define (ls-sum ls)
    (ls-sumR (cdr ls) (car ls)))
(define (ls-sumR ls lsm)
    (if (null? ls)
        lsm
        (let ((m (car ls)))
          (if (null? lsm)
              (ls-sumR (cdr ls) m)
              (ls-sumR (cdr ls) (+ m lsm))))))


;3.正の整数を表す文字列を整数に変換する関数
(define (str2int str)
    (ls-s2i (string->list str) 0)
)

(define (ls-s2i ls sum)
    (if (null? ls)
        sum
        (if (= 0 sum)
            (ls-s2i (cdr ls) (car2int ls))
            (ls-s2i (cdr ls) (+ sum (car2int ls)))
        )
    )
)

(define (10-njo n)
  (if (= n 0)
      1
      (* 10 (10-njo (- n 1))))
)

(define (yososu ls)
    (if (null? ls)
        0
        (+ 1 (yososu (cdr ls))))
)

(define (car2int ls)
  (* (- (char->integer (car ls)) 48) (10-njo (- (yososu ls) 1)))
)

;４＿名前付きlet
(define (fact-let n)
  (let loop((n1 n) (p n))
    (if (= n1 1)
        p
        (let ((m (- n1 1))) (loop m (* p m)))
        )
    )
  )


;; -----------------------------------------------------------
;; 第7章  練習問題 3 （末尾再帰関数の練習）
;; 2011.04.25
;; -----------------------------------------------------------
;1a.リストから任意の数字を排除する関数（名前つきletを使用すること！）
(define (ls-xlet ls n)
  (let loop((sheep '()) (goat ls))
    (if (null? goat) 
        (if (null? sheep) #f (reverse sheep))
        (let ((g_ (car goat)) (oat (cdr goat)))
          (if (or (eqv? g_ n) (equal? g_ n))
              (loop sheep oat)
              (loop (cons g_ sheep) oat))))))

;1b.リストから任意の数字の位置を返す関数.
(define (ls-xpos ls n)
  (let loop((pos 1) (goat ls))
    (if (null? goat) #f
        (if (eqv? (car goat) n)
            pos
            (loop (+ pos 1) (cdr goat))))))

;2a.リストの要素の順番を反転させる関数(名前つきlet)
(define (myrev-let ls)
  (let loop((sheep '()) (goat ls))
    (if (null? goat)
        sheep
        (loop (cons (car goat) sheep) (cdr goat)))))

;2b.数のリストの要素の合計を求める関数(名前つきlet)
(define (sum-let ls)
  (let loop((sum 0) (goat ls))
    (if (null? goat)
        sum
        (loop (+ (car goat) sum) (cdr goat)))))

;2c.

