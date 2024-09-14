import { Test } from "@nestjs/testing";
import { CountriesController } from "./countries.controller";
import { CountriesService } from "./countries.service";

const mockCountriesService = {
    getCountries: jest.fn(),
    createCountries: jest.fn(),
    clearCountries: jest.fn()
}

describe("countries controller", () => {
    let controller: CountriesController, service: CountriesService
    beforeEach(async () => {
        const module = await Test.createTestingModule({ controllers: [CountriesController], providers: [{ provide: CountriesService, useValue: mockCountriesService }] }).compile()
        controller = module.get(CountriesController)
        service = module.get(CountriesService)
    })

    it('controller долженм быть создан', () => {
        expect(controller).toBeDefined()
    })

    it('controller долженм возвращать города', () => {
        controller.getCountries()
        expect(service.getCountries).toHaveBeenCalled()
    })

    it("controller должен создавать город", () => {
        controller.createCountries({ countries: ["Москва", "Киров"] })
        expect(service.createCountries).toHaveBeenCalled()
    })

    it("controller должен удалять города", () => {
        controller.clearCountries()
        expect(service.clearCountries).toHaveBeenCalled()
    })
})