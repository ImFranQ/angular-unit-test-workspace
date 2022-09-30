import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';
import { faker } from '@faker-js/faker';

describe('PokemonService', () => {
  let service: PokemonService, controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(PokemonService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('pokemons', () => {
    it('pokemons list', (done) => {
      // Arange
      const offset = 0;
      const limit = 20;
      const mockData: {name:string, url: string}[] = Array(limit).fill(0).map(() => ({
        name: faker.name.firstName(),
        url: faker.internet.url()
      }))
      
      // Act
      service.pokemons().subscribe(data => {
        // Assert
        expect(data).toEqual(mockData); // Test if the data is the same as the mock data
        expect(mockData.length).toEqual(limit); // Test if the data length is the same as the limit
        done() // Finish the test
      })

      // get the request to replace the mock data
      const req = controller.expectOne(`${service.endpoint}/pokemon?offset=${offset}&limit=${limit}`);
      // set the mock data
      req.flush(mockData);

      // Chek url params
      const params = req.request.params;
      expect(params.get('offset')).toEqual(offset.toString());
      expect(params.get('limit')).toEqual(limit.toString());

      // verify that the request is complete
      controller.verify();
      
    })
  })
});
