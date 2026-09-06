import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgFor, NgIf, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GithubService } from './github.service';
import { SkillsComponent } from './skills.component';
import { ContactComponent } from './contact.component';
import { CookieConsentComponent } from './cookie-consent.component';

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, NgIf, NgFor, DatePipe, TitleCasePipe, RouterLink, SkillsComponent, ContactComponent, CookieConsentComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  styles: [`
    main { display: flex; flex-direction: column; }
    .navbar { order: 1; width: 100%; box-sizing: border-box; }
    .hero { order: 2; }
    .about { order: 3; min-height: calc(100vh - 150px); box-sizing: border-box; display: flex; flex-direction: column; justify-content: center; }
    .projects { order: 4; min-height: calc(100vh - 150px); box-sizing: border-box; }
    app-skills { order: 5; display: block; }
    app-contact { order: 6; display: block; }
    footer { order: 7; width: 100%; box-sizing: border-box; }
    .project-grid { grid-template-columns: repeat(4, 1fr); }
    .about { position: relative; isolation: isolate; max-width: 1190px; padding: 58px 8%; display: grid; grid-template-columns: minmax(285px, .9fr) 1.1fr; grid-template-rows: auto auto 1fr auto; column-gap: clamp(38px, 7vw, 105px); align-items: center; overflow: hidden; background: #e8ede3; }
    .about::before { content: ''; grid-row: 1 / 5; width: 100%; min-height: 495px; background: linear-gradient(180deg, transparent 55%, rgba(41, 51, 44, .2)), url('/images/himanshi-portrait.jpeg') center 32% / cover; border: 9px solid #f8f5ee; border-radius: 26px 26px 80px 26px; box-shadow: 14px 16px 0 #d5a976, 0 20px 35px rgba(39, 47, 40, .18); transform: rotate(-2.5deg); }
    .about::after { content: 'hello, there!  ✦'; position: absolute; left: 30px; bottom: 50px; z-index: 1; padding: 13px 17px; color: #fffaf1; background: #d95d3b; border: 3px solid #fffaf1; border-radius: 50%; box-shadow: 4px 5px 0 #884b38; font: italic 17px/1 Georgia, serif; transform: rotate(-12deg); }
    .about > * { grid-column: 2; position: relative; z-index: 1; }
    .about .eyebrow { align-self: end; margin-bottom: 20px; }
    .about h2 { max-width: 500px; margin: 0 0 24px; font-size: clamp(42px, 4vw, 60px); }
    .about > p:not(.eyebrow) { max-width: 480px; margin: 0; font-size: 16px; }
    .about .tags { margin-top: 31px; }
    .about .tags span { padding: 9px 14px; background: #f8f5ee; border: 0; box-shadow: 2px 3px 0 #c8d4c6; transform: rotate(-2deg); }
    .about .tags span:nth-child(2) { background: #f1cf51; transform: rotate(2deg); }
    .about .tags span:nth-child(3) { background: #efb18f; transform: rotate(-1deg); }
    main { background: radial-gradient(circle at 91% 8%, #f0d8a4 0 5%, transparent 22%), #faf7f0; }
    .navbar { max-width: 1240px; margin-top: 20px; height: 74px; padding: 0 28px; background: rgba(255, 253, 248, .78); border: 1px solid rgba(38, 39, 34, .08); border-radius: 18px; box-shadow: 0 10px 28px rgba(75, 63, 43, .08); backdrop-filter: blur(12px); }
    .nav-links { padding: 7px; margin-left: 0; background: #f0ece3; border-radius: 12px; gap: 3px; }
    .nav-links a { padding: 8px 12px; border-radius: 8px; }
    .nav-links a:hover { background: #fffdf8; }
    .hero { min-height: calc(100vh - 120px); padding-top: 65px; }
    .hero-art { border: 9px solid #fffdf8; border-radius: 28px 28px 96px 28px; box-shadow: 18px 18px 0 #e6bd78, 0 24px 48px rgba(73, 59, 39, .15); transform: rotate(1.5deg); }
    .hero-art::after { content: 'designing with intention'; position: absolute; right: 20px; bottom: 20px; z-index: 2; padding: 10px 13px; background: #fffdf8; border-radius: 8px; color: #315d54; font: italic 14px Georgia, serif; transform: rotate(-4deg); }
    .primary-btn { border: 2px solid #20211e; border-radius: 12px; box-shadow: 5px 5px 0 #df5b37; transition: transform .2s, box-shadow .2s; }
    .primary-btn:hover { transform: translate(3px, 3px); box-shadow: 2px 2px 0 #df5b37; }
    .projects { background: #273832; border: 8px solid #fffdf8; box-shadow: 14px 14px 0 #d9a670; }
    .section-heading { padding-bottom: 25px; border-bottom: 1px dashed rgba(255,255,255,.35); }
    .project-card { border: 5px solid #fffdf8; border-radius: 19px 19px 48px 19px; box-shadow: 5px 6px 0 rgba(226, 173, 91, .72); }
    .project-card:nth-child(2n) { transform: translateY(25px) rotate(1deg); }
    .project-card:nth-child(3n) { border-radius: 48px 19px 19px 19px; transform: translateY(9px) rotate(-1deg); }
    .project-card:hover, .project-card:nth-child(2n):hover, .project-card:nth-child(3n):hover { transform: translateY(-8px) rotate(0); }
    .project-art { border-radius: 12px 12px 35px 12px; }
    footer { margin-top: 40px; padding-top: 22px; border-top: 1px solid #e2ddd2; }
    @media (max-width: 850px) { .navbar { margin: 0 16px; width: auto; } .about, .projects { min-height: auto; } .about { display: grid; grid-template-columns: 1fr; gap: 27px; padding: 45px 10%; } .about::before { grid-row: auto; min-height: 430px; max-width: 410px; } .about > * { grid-column: 1; } .about::after { left: 34px; bottom: auto; top: 390px; } .project-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 520px) { .about { padding: 38px 25px; } .about::before { min-height: 365px; } .about::after { top: 330px; left: 27px; font-size: 14px; } .project-grid { grid-template-columns: 1fr; } }
  `],
})
export class HomeComponent { private readonly github = inject(GithubService); readonly projects$ = this.github.getProjects(); }
