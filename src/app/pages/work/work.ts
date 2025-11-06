import { ChangeDetectorRef, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, PLATFORM_ID, ViewChild } from '@angular/core';
import data from "./projects.json"
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { faGithub, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { SwiperContainer } from 'swiper/element';
import { Swiper } from 'swiper/types';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-work',
  imports: [FaIconComponent],
  templateUrl: './work.html',
  styleUrl: './work.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Work {

  private platformId = inject(PLATFORM_ID)
  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  projects = Object.values(data)

  faArrowUpRightFromSquare = faArrowUpRightFromSquare
  faGithub = faGithub
  faYoutube = faYoutube

  @ViewChild('swiperRef') swiperRef: ElementRef<SwiperContainer> | undefined;

  indexStatuses: Record<number, "active" | "to-be-active-up" | "to-be-active-down" | "up" | "down"> = {}
  activeIndex: number = 0;

  constructor() {
    this.projects.forEach((_, index) => {
      this.indexStatuses[index] = index === 0 ? "active" : "down"
    })
  }

  ngAfterViewInit(): void {
    if (!this.swiperRef || !this.swiperRef.nativeElement) return;

    if (!isPlatformBrowser(this.platformId)) return;

    const swiperInstance = this.swiperRef.nativeElement.swiper;

    swiperInstance.on("navigationNext", (swiper) => {
      const toBeActiveSlideIndex = this.activeIndex === (this.projects.length - 1) ? 0 : this.activeIndex + 1
      const temp = {
        [toBeActiveSlideIndex]: "to-be-active-up",
        [this.activeIndex]: "down"
      } as const
      this.indexStatuses = { ...this.indexStatuses, ...temp }
      this.cdr.detectChanges()
      setTimeout(() => {
        this.indexStatuses = { ...this.indexStatuses, [toBeActiveSlideIndex]: "active" }
        this.activeIndex = toBeActiveSlideIndex
        this.cdr.detectChanges();
      }, 1);
    })

    swiperInstance.on("navigationPrev", () => {
      const toBeActiveSlideIndex = this.activeIndex === 0 ? this.projects.length - 1 : this.activeIndex - 1
      const temp = {
        [toBeActiveSlideIndex]: "to-be-active-down",
        [this.activeIndex]: "up"
      } as const
      this.indexStatuses = { ...this.indexStatuses, ...temp }
      this.cdr.detectChanges()
      setTimeout(() => {
        this.indexStatuses = { ...this.indexStatuses, [toBeActiveSlideIndex]: "active" }
        this.activeIndex = toBeActiveSlideIndex
        this.cdr.detectChanges();
      }, 1);
    })
  }

}
