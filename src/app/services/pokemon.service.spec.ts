import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonService } from './pokemon.service';

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
      const mockData: {name:string, url: string}[] = [{
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/"
      }]
      
      // Act
      service.pokemons().subscribe(data => {
        // Assert
        expect(data).toEqual(mockData); // Test if the data is the same as the mock data
        done() // Finish the test
      })

      // get the request to replace the mock data
      const req = controller.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      // set the mock data
      req.flush(mockData);
      // verify that the request is complete
      controller.verify();
      
    })
  })
});
