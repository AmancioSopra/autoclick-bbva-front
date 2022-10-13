import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { httpTranslateLoader } from 'src/app/app.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HomePageComponent } from './home-page.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageComponent ],
      imports : [
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: httpTranslateLoader,
              deps: [HttpClient],
            }}),
        
      ],
      providers: [
        TranslateService,
        HttpClient,
        HttpHandler,
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showRanking button must works OK', ()  => {
    const btn = fixture.nativeElement.querySelector("#rankingBtn");
    expect(component.btnLabel).toEqual("pages.home.seeRanking");
    btn.click();
    expect(component.btnLabel).toEqual("pages.home.back");
    btn.click();
    expect(component.btnLabel).toEqual("pages.home.seeRanking");
  })

});
