import { Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe, NgIf, TitleCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { GithubService } from './github.service';

@Component({
  selector: 'app-project-detail',
  imports: [AsyncPipe, NgIf, DatePipe, TitleCasePipe, RouterLink],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
  styles: [`
    .detail-page { background: radial-gradient(circle at 94% 4%, #efd8a4 0 6%, transparent 22%), #faf7f0; }
    .detail-page .navbar { max-width: 1240px; margin-top: 20px; height: 74px; padding: 0 28px; background: rgba(255,253,248,.82); border: 1px solid rgba(38,39,34,.08); border-radius: 18px; box-shadow: 0 10px 28px rgba(75,63,43,.08); }
    .back-link { padding: 10px 14px; background: #efebe2; border-radius: 10px; }
    .project-hero { padding-top: 58px; }
    .detail-art { border: 9px solid #fffdf8; border-radius: 27px 27px 95px 27px; box-shadow: 15px 15px 0 #d5a976, 0 22px 40px rgba(66,54,36,.14); transform: rotate(1deg); }
    .project-info { margin-top: 46px; padding: 25px 30px; background: #fffdf8; border: 1px solid #e5ded1; border-radius: 18px; box-shadow: 0 11px 25px rgba(65,56,43,.06); }
    .project-info > div { padding-left: 14px; border-left: 3px solid #df5b37; }
    .details { padding-top: 105px; }
    .links { padding: 16px 22px; background: #e8eee7; border-radius: 18px 18px 48px 18px; box-shadow: 7px 7px 0 #b7c9b7; }
    .links a:last-child { border-bottom: 0; }
    @media (max-width: 700px) { .detail-page .navbar { margin: 0 16px; width: auto; } .project-info { margin: 34px 16px 0; } }
  `],
})
export class ProjectDetailComponent { private readonly route = inject(ActivatedRoute); private readonly github = inject(GithubService); readonly project$ = this.route.paramMap.pipe(switchMap(params => this.github.getProject(params.get('id') ?? ''))); }
