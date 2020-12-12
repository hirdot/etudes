; define +1
(define (1+ x)
  (+ x 1))

; define -1
(define (1- x)
  (- x 1))

; define 等比数列の和
(define (sum-gp a0 r n)
  * a0 (if (= r 1)
           n
           (/ (- 1 (expt r n )) (- 1 r)) ;!!
       )
)

; define absの再発明
(define (abs_ x)
  (if (< x 0)
      (* -1 x)
      x)
  )

; Reciprocal の再発明
(define (recip_ x)
  (if (= x 0)
      #f
      (/ 1 x)))

; int -> ASCII
(define (i->a x)
  (if (<= 33 x 126)
      (integer->char x)))

; 3 Positive integer
(define (3posInt x y z)
  (if (and (> x 0) (> y 0) (> z 0))
      (* x (* y z))
      #f))

; 3 Negative integer
(define (3negInt x y z)
  (if (or (and (> x 0) (> y 0) (< z 0))
          (and (> x 0) (< y 0) (> z 0))
          (and (< x 0) (> y 0) (> z 0))
      )
      (* x (* y z))
      #f
      ))


