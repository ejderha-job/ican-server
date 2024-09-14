import { Test } from "@nestjs/testing"
import { CountriesService } from "./countries.service"
import { CountriesController } from "./countries.controller"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Countries } from "./entity/countries.entity"
import { Repository } from "typeorm"

const cityRepository = {
    find: jest.fn(),
    save: jest.fn()
}

describe("тестирование сервиа", () => {
    let service: CountriesService, repository: Repository<Countries>

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CountriesService, { provide: getRepositoryToken(Countries), useValue: cityRepository }],
            controllers: [CountriesController],
        }).compile()

        service = module.get(CountriesService)
        repository = module.get(getRepositoryToken(Countries))
    })

    it('Сервис долженм быть создан', () => {
        expect(service).toBeDefined()
    })

    it('getCountries долженм вернуть список городов', async () => {
        cityRepository.find.mockReturnValue([])

        const res = await service.getCountries()

        expect(res).toEqual([])
        expect(repository.find).toHaveBeenCalled()
    })

    it("createCountries создает город", async () => {
        cityRepository.save.mockImplementation((value) => ({ title: value }))
        const cities = ["Москва", "Киров"]
        const res = await service.createCountries(cities)
        expect(res).toHaveLength(2)
    })
})
