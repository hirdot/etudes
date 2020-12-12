; hello with name
(define hello 
  (lambda (name)
    (string-append "Hello " name "!")))
;; another writing
(define (hello_ name)
  (string-append "Hello " name "!"))


;sum of three sumbers
(define sum3
  (lambda (a b c)
    (+ a b c)))
;; another writing
(define (sum3_ a b c)
  (+ a b c))
  
;sum of n sumbers
(define sum3+
  (lambda (a b c . d)
    (list a b c d)))
;; another writing
(define (sum3+_ a b c . d)
  (list a b c d))