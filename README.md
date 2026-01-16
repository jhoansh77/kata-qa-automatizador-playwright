# Kata QA Automatizador Junior – DemoQA

## Descripción
Este proyecto corresponde a una Kata técnica para el rol de QA Automatizador Junior.
El objetivo es validar el correcto funcionamiento del formulario de registro de usuarios
disponible en el sitio DemoQA, mediante pruebas automatizadas utilizando Playwright.

URL bajo prueba:
https://demoqa.com/automation-practice-form

---

## Tecnologías utilizadas
- Node.js
- Playwright
- TypeScript
- Visual Studio Code

---

## Estructura del proyecto


---

## Estrategia de pruebas
Se aplicaron técnicas de pruebas de caja negra, tales como:
- Análisis de valores límite
- Pruebas combinatorias

Los escenarios funcionales fueron definidos previamente y posteriormente automatizados
como pruebas end-to-end.

Durante la automatización se identificaron comportamientos inconsistentes del sitio bajo prueba, por lo que se ajustaron las esperas y validaciones para garantizar estabilidad multi-navegador.

---

## Consideraciones técnicas y estabilidad de pruebas

Durante la ejecución de las pruebas automatizadas se identificaron comportamientos
intermitentes del sitio DemoQA, especialmente en el navegador Firefox, relacionados
con validaciones internas del formulario y eventos de carga que no siempre se resuelven
de forma consistente.

En particular, el caso de prueba **CF-004 (Validación del campo Mobile Number con menos
de 10 dígitos)** presentó latencias y bloqueos internos del sistema bajo prueba, lo que
ocasionaba timeouts en Firefox sin afectar la lógica del test ni el comportamiento en
otros navegadores. Luego de esto, con las demas pruebas se empezo a notar mas latencia, por lo que al ejecutarlas posteriormente, arrojaba el error donde antes no lo habia

Para garantizar la estabilidad de la automatización y evitar falsos negativos, se decidió
ajustar el timeout únicamente en este caso específico mediante test.describe.configure({ timeout: 100000 });,
manteniendo los valores por defecto en el resto de pruebas.

Esta decisión fue tomada de forma consciente como parte del análisis QA, priorizando
la confiabilidad de la ejecución multi-navegador sin impactar negativamente el resto
del framework.

Debido a la inestabilidad y latencias del sitio DemoQA bajo ejecución concurrente,
la configuración de Playwright fue ajustada para ejecutar las pruebas de forma
secuencial (`workers: 1`, `fullyParallel: false`) y con reintentos automáticos
(`retries: 2`), evitando falsos negativos derivados de fallos de red o carga.

Adicionalmente, se habilitó la captura de trazas únicamente en el primer reintento
para facilitar el análisis de errores sin afectar el rendimiento general de la suite.


