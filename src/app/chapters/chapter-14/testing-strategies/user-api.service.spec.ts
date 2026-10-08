import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UserApiService } from './user-api.service';

describe('UserApiService', () => {
  let httpMock: HttpTestingController;
  let service: UserApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(UserApiService);
  });

  it('maps API response to domain model (Adapter)', async () => {
    const promise = service.getUser('1'); // Promise<User> or firstValueFrom(...)
    const req = httpMock.expectOne('/api/users/1');
    req.flush({ id: '1', full_name: 'Alice' });

    const user = await promise;
    expect(user.name).toBe('Alice');
  });
});
