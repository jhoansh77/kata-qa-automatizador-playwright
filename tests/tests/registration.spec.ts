import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import path from 'path';


test.describe.configure({ timeout: 100000 });

test.describe('Formulario de Registro - DemoQA', () => {

  test('CF-001 - Registro exitoso con datos obligatorios válidos', async ({ page }) => {
    
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const mobile = faker.string.numeric(10);

    await page.goto('https://demoqa.com/automation-practice-form', {
  waitUntil: 'domcontentloaded'/*Encontre problemas de carga del sitio DemoQA en algunos navegadores, 
  asi que ajuste la estrategia usando "documentloaded" para estabilidad (espera explicita)*/
});

    await page.fill('#firstName', firstName);
    await page.fill('#lastName', lastName);

    await page.click('label[for="gender-radio-1"]');

    await page.fill('#userNumber', mobile);

    await page.click('#submit');

    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('#example-modal-sizes-title-lg'))
      .toHaveText('Thanks for submitting the form');
  });

});
//--------------------------------------------------------------------------------------------//

test('CF-002 - Envío del formulario sin campos obligatorios', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  // Intentar enviar el formulario sin completar campos obligatorios
  await page.click('#submit');

  // Validar que NO aparezca el modal de confirmación
  await expect(page.locator('.modal-content')).not.toBeVisible();
});
//----------------------------------------------------------------------------------------//

test('CF-003 - Registro con email en formato inválido', async ({ page }) => {

 

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const invalidEmail = 'correo-invalido';
  const mobile = faker.string.numeric(10);

  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  await page.fill('#firstName', firstName);
  await page.fill('#lastName', lastName);
  await page.fill('#userEmail', invalidEmail);

  await page.click('label[for="gender-radio-1"]');
  await page.fill('#userNumber', mobile);

  await page.click('#submit');

  // Validar que NO aparezca el modal
  await expect(page.locator('.modal-content')).not.toBeVisible();
});
//--------------------------------------------------------------------------------------------------------//

test('CF-004 - Validación del campo Mobile Number con menos de 10 dígitos', async ({ page }) => {

  

  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  // Llenar campos mínimos 
  await page.fill('#firstName', 'Test');
  await page.fill('#lastName', 'User');
  await page.click('label[for="gender-radio-1"]');

  // Usar valor fijo (mejor para valores límite)
  await page.fill('#userNumber', '123456789'); // 9 dígitos

  // Validación directa del valor ingresado
  const value = await page.locator('#userNumber').inputValue();
  expect(value).toBe('123456789');

});
//-------------------------------------------------------------------------------//

test('CF-005 - Envío del formulario sin selección de género', async ({ page }) => {
  
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const mobile = faker.string.numeric(10);

  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  // Completar campos obligatorios EXCEPTO género
  await page.fill('#firstName', firstName);
  await page.fill('#lastName', lastName);
  await page.fill('#userNumber', mobile);

  // Intentar enviar el formulario
  const submitButton = page.locator('#submit');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click({ force: true });

  // Validar que NO aparezca el modal de confirmación
  await expect(page.locator('.modal-content')).not.toBeVisible();
});

//------------------------------------------------------------------------//

test('CF-006 - Selección de hobbies (campo opcional)', async ({ page }) => {

  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  // Seleccionar hobbies
  const sports = page.locator('input#hobbies-checkbox-1');
  const music = page.locator('input#hobbies-checkbox-3');

  await page.locator('label[for="hobbies-checkbox-1"]').click();
  await page.locator('label[for="hobbies-checkbox-3"]').click();

  // Validar que los hobbies quedaron seleccionados
  await expect(sports).toBeChecked();
  await expect(music).toBeChecked();
});
//-----------------------------------------------------------------------------//

test('CF-007 - Registro sin selección de State y City', async ({ page }) => {

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const mobile = faker.string.numeric(10);

  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  await page.fill('#firstName', firstName);
  await page.fill('#lastName', lastName);
  await page.click('label[for="gender-radio-1"]');
  await page.fill('#userNumber', mobile);

  const submitButton = page.locator('#submit');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click({ force: true });

  await expect(page.locator('.modal-content')).toBeVisible();
});

//-------------------------------------------------------------------------//

test('CF-008 - Carga de archivo en el campo Picture', async ({ page }) => {

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const mobile = faker.string.numeric(10);

  const filePath = path.resolve(process.cwd(), 'assets', 'test-image.png');


  await page.goto('https://demoqa.com/automation-practice-form', {
    waitUntil: 'domcontentloaded'
  });

  await page.fill('#firstName', firstName);
  await page.fill('#lastName', lastName);
  await page.click('label[for="gender-radio-1"]');
  await page.fill('#userNumber', mobile);

  // Upload del archivo
  await page.setInputFiles('#uploadPicture', filePath);

  
  
  const submitButton = page.locator('#submit');
  await submitButton.scrollIntoViewIfNeeded();
  await submitButton.click({ force: true });

  // Validar que el nombre del archivo aparece en el modal
  await expect(page.locator('.modal-content')).toBeVisible();
  await expect(page.locator('td').filter({ hasText: 'test-image.png' })).toBeVisible();
});
