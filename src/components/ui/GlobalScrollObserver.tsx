'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function GlobalScrollObserver() {
    const pathname = usePathname()

    useEffect(() => {
        // Pequeno atraso para garantir que a transição de rota terminou e o DOM da nova página renderizou
        const timer = setTimeout(() => {
            // Define os elementos que queremos animar (excluindo os que não devem ter animação)
            const selectors = [
                'section h1',
                'section h2',
                'section h3',
                'section p',
                'section img:not([alt=""] )',
                '.card',
                '.section-label',
                'section .btn-primary',
                'section .btn-secondary',
                'section .btn-outline-light'
            ].join(', ')

            const elements = document.querySelectorAll(selectors)

            elements.forEach(el => {
                // Ignora elementos que já têm a classe ou que os pais indicam para não animar
                if (!el.classList.contains('animate-on-scroll') && !el.closest('.no-animate')) {
                    // Desabilita transição temporariamente para esconder instantaneamente
                    const htmlEl = el as HTMLElement
                    const originalTransition = htmlEl.style.transition
                    htmlEl.style.transition = 'none'

                    el.classList.add('animate-on-scroll')

                    // Força reflow
                    void htmlEl.offsetHeight

                    htmlEl.style.transition = originalTransition
                }
            })

            // Observer para detectar quando o elemento entra na tela
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('in-view')
                            // Anima apenas uma vez para não ficar piscando toda hora
                            observer.unobserve(entry.target)
                        }
                    })
                },
                {
                    root: null,
                    rootMargin: '0px 0px -50px 0px', // Aciona quando o elemento passar 50px do fundo da tela
                    threshold: 0.1 // 10% do elemento tem que estar visível
                }
            )

            // Inicia a observação de todos os elementos configurados
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.observe(el)
            })

            return () => {
                observer.disconnect()
            }
        }, 150)

        return () => clearTimeout(timer)
    }, [pathname])

    return null
}
