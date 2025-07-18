import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(minutes: number): string {
        if (!minutes && minutes !== 0) return '00:00 hours';
        
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        
        const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
        const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
        
        const hourText = hours === 1 && remainingMinutes === 0 ? 'hour' : 'hours';
        
        return `${formattedHours}:${formattedMinutes} ${hourText}`;
    }
}