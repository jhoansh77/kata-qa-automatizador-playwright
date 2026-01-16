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

## Documentación

La documentación del plan de pruebas y análisis del formulario se encuentra disponible en el siguiente archivo:

- 📄 `docs/Plan_de_Pruebas_Formulario_Registro_DemoQA.pdf`



---

## Estrategia de pruebas
Técnicas de diseño de pruebas utilizadas
Partición de Equivalencia: Consiste en dividir los datos de entrada en grupos (válidos e inválidos) que se espera que el sistema trate de la misma manera.
Email válido vs email inválido (CF-001 / CF-003)
Mobile Number válido vs inválido (CF-001 / CF-004)
Formulario con campos obligatorios completos vs incompletos (CF-001 / CF-002)
Justificación: Se seleccionaron valores representativos de cada grupo para reducir la cantidad de pruebas sin perder cobertura funcional.

Pruebas de Caja Negra: Se valida el comportamiento del sistema sin considerar la lógica interna o el código fuente.
En todos los casos de prueba, ya que el formulario se evaluó únicamente desde la perspectiva del usuario final.
Justificación El objetivo fue validar la funcionalidad observable del formulario, independientemente de su implementación interna.

Pruebas Positivas (Happy Path): Validan que el sistema funcione correctamente cuando se ingresan datos válidos.
Registro exitoso (CF-001)
Registro con hobbies seleccionados (CF-006)
Registro sin State y City (CF-007)
Carga exitosa de archivo (CF-008)
Justificación: Permiten asegurar que el flujo principal del formulario funciona correctamente bajo condiciones esperadas.


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


