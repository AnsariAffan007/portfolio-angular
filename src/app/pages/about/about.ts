import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, inject, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: 'app-about',
  templateUrl: './about.html',
  styleUrl: './about.scss',
  imports: [RouterLink]
})
export class About implements AfterViewInit {

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private route: ActivatedRoute) { }

  // Save section links
  @ViewChild("expCheckpoint") experienceLink!: ElementRef;
  @ViewChild("toolsCheckpoint") toolsLink!: ElementRef;
  @ViewChild("educationCheckpoint") educationLink!: ElementRef;
  @ViewChild("hobbiesCheckpoint") hobbiesLink!: ElementRef;
  @ViewChild("reachoutCheckpoint") reachOutLink!: ElementRef;

  // Saving actual sections of about
  @ViewChild("description") description!: ElementRef;
  @ViewChild("experience") experience!: ElementRef;
  @ViewChild("toolsUsed") toolsUsed!: ElementRef;
  @ViewChild("education") education!: ElementRef;
  @ViewChild("hobbies") hobbies!: ElementRef;
  @ViewChild("reachout") reachout!: ElementRef;

  // Saving all thumbs
  @ViewChild("aboutToExpThumb") aboutToExpThumb!: ElementRef;
  @ViewChild("expToToolsThumb") expToToolsThumb!: ElementRef;
  @ViewChild("toolsToEducationThumb") toolsToEducationThumb!: ElementRef;
  @ViewChild("educationToHobbiesThumb") educationToHobbiesThumb!: ElementRef;
  @ViewChild("hobbiesToReachoutThumb") hobbiesToReachoutThumb!: ElementRef;

  // Saving distance between sub sections
  descToExp: number = 0;
  expToTools: number = 0;
  toolsToEducation: number = 0;
  educationToHobbies: number = 0;
  hobbiesToReachOut: number = 0;

  fragment: string | null = null
  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      this.fragment = fragment
    });
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.descToExp = this.getDistance(this.description, this.experience)
        this.expToTools = this.getDistance(this.experience, this.toolsUsed)
        this.toolsToEducation = this.getDistance(this.toolsUsed, this.education)
        this.educationToHobbies = this.getDistance(this.education, this.hobbies)
        this.hobbiesToReachOut = this.getDistance(this.hobbies, this.reachout)
      }, 0)
      try {
        document.getElementById(this.fragment || '')?.scrollIntoView();
      }
      catch (e) { }
    }
  }

  getDistance(div1: ElementRef<HTMLElement>, div2: ElementRef<HTMLElement>) {
    let rect1 = div1.nativeElement.getBoundingClientRect();
    let rect2 = div2.nativeElement.getBoundingClientRect();

    let centerX1 = rect1.left + rect1.width / 2;
    let centerY1 = rect1.top + rect1.height / 2;

    let centerX2 = rect2.left + rect2.width / 2;
    let centerY2 = rect2.top + rect2.height / 2;

    // Calculate the distance between the center points of the divs
    let distance = Math.sqrt(Math.pow(centerX2 - centerX1, 2) + Math.pow(centerY2 - centerY1, 2));
    return distance;
  }

  onAboutScroll(event: Event) {
    setTimeout(() => this.updateScollThumb(event, this.aboutToExpThumb, this.experienceLink, 0, this.descToExp), 0);
    setTimeout(() => this.updateScollThumb(event, this.expToToolsThumb, this.toolsLink, this.descToExp, this.expToTools), 0);
    setTimeout(() => this.updateScollThumb(event, this.toolsToEducationThumb, this.educationLink, this.descToExp + this.expToTools, this.toolsToEducation), 0);
    setTimeout(() => this.updateScollThumb(event, this.educationToHobbiesThumb, this.hobbiesLink, this.descToExp + this.expToTools + this.toolsToEducation, this.educationToHobbies), 0);
    setTimeout(() => this.updateScollThumb(event, this.hobbiesToReachoutThumb, this.reachOutLink, this.descToExp + this.expToTools + this.toolsToEducation + this.educationToHobbies, this.hobbiesToReachOut), 0);
  }

  updateScollThumb(e: Event, thumb: ElementRef, link: ElementRef, extraHeightFromTop: number, totalHeight: number) {
    const scrolledFromTop = (e.target as HTMLElement)?.scrollTop || 0
    let progress = ((scrolledFromTop - extraHeightFromTop) / (totalHeight * 0.9)) * 100;
    progress = Math.max(0, progress);
    progress = Math.min(100, progress);
    if (progress === 100) link.nativeElement.setAttribute("checkpoint", "");
    else link.nativeElement.removeAttribute("checkpoint");
    // thumb.style.height = progress + '%'
    thumb.nativeElement.animate(
      {
        height: progress + '%'
      },
      {
        duration: 300,
        fill: "forwards"
      }
    )
  }

  scrollToElement(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }
}