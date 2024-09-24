import { Test } from "@nestjs/testing"
import { CountriesService } from "./countries.service"
import { getRepositoryToken } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CountryEntity } from "src/typeorm/countries.entity"
import { CountriesController } from "../controller/countries.controller"

const cityRepository = {
    find: jest.fn(),
    save: jest.fn()
}

describe("тестирование сервиа", () => {
    let service: CountriesService, repository: Repository<CountryEntity>

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [CountriesService, { provide: getRepositoryToken(CountryEntity), useValue: cityRepository }],
            controllers: [CountriesController],
        }).compile()

        service = module.get(CountriesService)
        repository = module.get(getRepositoryToken(CountryEntity))
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
