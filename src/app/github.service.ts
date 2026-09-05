import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, of, shareReplay } from 'rxjs';

export interface GithubProject { id: number; name: string; description: string | null; html_url: string; homepage: string | null; language: string | null; topics: string[]; stargazers_count: number; forks_count: number; updated_at: string; created_at: string; default_branch: string; private: boolean; }

// Replace this with the GitHub handle you want to display.
export const GITHUB_USERNAME = 'hodophile014';

@Injectable({ providedIn: 'root' })
export class GithubService {
  private readonly http = inject(HttpClient);
  private readonly api = `https://api.github.com/users/${GITHUB_USERNAME}/repos?type=owner&sort=updated&per_page=100`;
  private readonly projects$ = this.http.get<GithubProject[]>(this.api).pipe(
    catchError(() => of([])),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  getProjects(): Observable<GithubProject[]> { return this.projects$; }
  getProject(name: string): Observable<GithubProject> { return this.http.get<GithubProject>(`https://api.github.com/repos/${GITHUB_USERNAME}/${encodeURIComponent(name)}`); }
}
