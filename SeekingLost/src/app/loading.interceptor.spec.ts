import { TestBed } from '@angular/core/testing';
import { HttpInterceptor } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('loadingInterceptor', () => {
  let interceptor: HttpInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadingInterceptor]
    });
    interceptor = TestBed.inject(LoadingInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
