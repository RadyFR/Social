const {By, Key, Builder, Browser ,  until} = require('selenium-webdriver')
const { writeFile } = require('node:fs/promises') 
require("chromedriver")

let seccionAccount = 'https://github.com/login'
let userinformation = "radifr23@gmail.com"
let pass = "Netconfigserver1@"
let button = "commit"



async function administrarSecciones(){
    
    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.get(seccionAccount);

    //Inicio de seccion
    await driver.findElement(By.name("login")).sendKeys(userinformation);
    await driver.findElement(By.name("password")).sendKeys(pass);
    
    //tomando la captura del inicio de seccion
    let image = await driver.takeScreenshot()
    await driver.findElement(By.name(button)).click()
    await writeFile("Log_in.png", image, 'base64')

    //creando el repositorio de manera automatica
    // EliminarRepo(driver)
    // CreateRepo(driver)
    //TryLoging()
    loginOut(driver)

}

async function CreateRepo(driver) {
    //variables para creacion del nueo repositorio
    let ButtonCreate = "/html/body/div[1]/div[1]/header/div/div[2]/div[2]/react-partial-anchor/button"
    let createNew = "//html/body/div[4]/div/div/div/ul/li[1]/a"
    let repositoryName = "/html/body/div[1]/div[5]/main/react-app/div/form/div[3]/div[1]/div[1]/div[1]/fieldset/div/div[2]/div/span/input"
    let description = "/html/body/div[1]/div[5]/main/react-app/div/form/div[3]/div[1]/div[1]/div[3]/span/input"
    let btnCreateRepository = "/html/body/div[1]/div[5]/main/react-app/div/form/div[5]/button"

    //credenciales para informacion del repo
    let nameR = 'NuevoRepositorio'
    let infoDescrip ="Creando un repositorio automatizado desde selenium"

    //pasos a seguir
    await driver.findElement(By.xpath(ButtonCreate)).click()
    await driver.findElement(By.xpath(createNew)).click()
    await driver.wait(until.elementLocated(By.xpath(repositoryName)), 2000).sendKeys(nameR)
    await driver.wait(until.elementLocated(By.xpath(description)), 2000).sendKeys(infoDescrip)
    await driver.executeScript("window.scrollBy(0, 1000)");
    await driver.findElement(By.xpath(repositoryName)).click()

    let image = await driver.takeScreenshot()
    await writeFile("creando_usuario.png", image, 'base64')
    await driver.wait(until.elementLocated(By.xpath(btnCreateRepository)),2000).click()
}


async function EliminarRepo(driver) {
    let repoeleiminar ="NuevoRepositorio"

    let repoAside ='/html/body/div[1]/div[5]/div/div/aside/div/div/loading-context/div/div[1]/div/ul/li[1]/div/div/a'
    let hideRepo = '/html/body/div[1]/div[1]/header/div[2]/nav/div/action-menu/focus-group/button'
    let setting = '/html/body/div[1]/div[1]/header/div[2]/nav/div/action-menu/focus-group/anchored-position/div/div/action-list/div/ul'
    let generalId ='/html/body/div[1]/div[5]/div/main/turbo-frame/div/div/div/div[2]/div/div/div/div[1]/h2'
    let deleteRepo ='/html/body/div[1]/div[5]/div/main/turbo-frame/div/div/div/div[2]/div/div/div/div[9]/ul/li[5]/div[1]/form/button'
    let wantdeleteRepo ='/html/body/div[1]/div[5]/div/main/turbo-frame/div/div/div/div[2]/div/div/div/div[9]/ul/li[5]/div[1]/form/dialog-helper/dialog/div[2]/div/div/button'
    let understandRepo ='/html/body/div[1]/div[5]/div/main/turbo-frame/div/div/div/div[2]/div/div/div/div[9]/ul/li[5]/div[1]/form/dialog-helper/dialog/div[2]/div/div/button'
    let inputDelete ='/html/body/div[1]/div[5]/div/main/turbo-frame/div/div/div/div[2]/div/div/div/div[9]/ul/li[5]/div[1]/form/dialog-helper/dialog/div[2]/div/div/primer-text-field/div[1]/input'
    let completeDelete = '/html/body/div[1]/div[5]/div/main/turbo-frame/div/div/div/div[2]/div/div/div/div[9]/ul/li[5]/div[1]/form/dialog-helper/dialog/div[2]/div/div/button'

    
    await driver.findElement(By.xpath(repoAside)).click()
    await driver.findElement(By.xpath(hideRepo)).click()
    await driver.findElement(By.xpath(setting)).click()
    await driver.wait(until.elementLocated(By.xpath(generalId)),2000).click()
    await driver.executeScript("window.scrollBy(0, 3000)");
    await driver.wait(until.elementLocated(By.xpath(deleteRepo)),2000).click()
    await driver.wait(until.elementLocated(By.xpath(wantdeleteRepo)),2000).click()
    await driver.wait(until.elementLocated(By.xpath(understandRepo)),2000).click()

    let image = await driver.takeScreenshot()
    await writeFile("Eliminando_repo.png", image, 'base64')

    await driver.wait(until.elementLocated(By.xpath(inputDelete)), 2000).sendKeys(`RadyFR/${repoeleiminar}`)
    await driver.wait(until.elementLocated(By.xpath(completeDelete)),2000).click()
} 

    

async function TryLoging(driver) {
   
    //Inicio de seccion
    await driver.findElement(By.name("login")).sendKeys(userinformation);
    await driver.findElement(By.name("password")).sendKeys("*******");
    await driver.findElement(By.name(button)).click()

    //tomando la captura del inicio de seccion
    let image = await driver.takeScreenshot()
    await writeFile("IntentoFallido.png", image, 'base64')
}


async function loginOut(driver) {
    let perfil = '/html/body/div[1]/div[1]/header/div[1]/div[2]/div[3]/deferred-side-panel/include-fragment/react-partial-anchor/button'
    let logout ='/html/body/div[4]/div/div/div/div[2]/div/ul/li[23]/a'
    let confirmlogout ='/html/body/div[1]/div[4]/main/div/div[3]/div/div[2]/form/input[3]'

    await driver.wait(until.elementLocated(By.xpath(perfil)),2000).click()
    await driver.wait(until.elementLocated(By.xpath(logout)),6000).click()

   
    let image = await driver.takeScreenshot()
    await writeFile("cerrandoseccion.png", image, 'base64')
    await driver.wait(until.elementLocated(By.xpath(confirmlogout)),2000).click()
    
}

administrarSecciones()
// TryLoging()
