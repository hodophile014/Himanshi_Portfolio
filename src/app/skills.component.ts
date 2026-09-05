import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
  styles: [`
    .skills-links { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 26px; }
    .skills-links a { padding: 10px 13px; border: 2px solid #29312d; border-radius: 9px; background: #29312d; box-shadow: 3px 3px 0 #d95d3b; color: #fffdf8; font-size: 12px; font-weight: 700; text-decoration: none; transition: transform .2s; }
    .skills-links a:hover { transform: translate(2px, 2px); box-shadow: 1px 1px 0 #d95d3b; }
    .skills-links span { margin-left: 5px; color: #f1cf51; }
    .skill-note.backend { background: #cfe0d3; transform: rotate(-2deg); }
    .skill-note.frontend { grid-row: auto; background: #efd05a; transform: rotate(2deg); }
    .skill-note.data { background: #eeb18d; transform: rotate(-1deg); }
    .skill-note.delivery { background: #d7c9e7; transform: rotate(1deg); }
    .lock { position: absolute; right: 21px; bottom: 20px; color: #725286; font-family: Georgia, serif; font-size: 27px; font-style: normal; }
    @media (max-width: 520px) { .skill-note { min-height: 190px; } }
  `],
})
export class SkillsComponent {}
