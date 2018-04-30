import * as Crawlers from "./crawlers/index";

export class Crawler 
{
    public Interval: number = 5;
    private Stopped: boolean = true;
    private List: Array<any> = [];

    constructor(private Bot: any, private Client: any)
    {
        Object.keys(Crawlers).forEach
        (
            (key: string) => 
            {
                if (key !== "__esModule") 
                {
                    this.List.push(Crawlers[key]);
                }
            }
        );
    }

    private Crawl(iterate: number = 0): void 
    {
        if(this.Stopped)
        {
            return;
        }

        if (typeof this.List[iterate] === "undefined")
        {
            // We consumed all crawlers, let's take a pause
            setTimeout
            (
                () => 
                {
                    this.Crawl();
                },
                this.Interval * 1000
            );

            return;
        }

        this.List[iterate].crawl
        (
            (response: any) => 
            {
                this.Interceptor(response);
                this.Crawl(iterate + 1);
            }
        );
    }

    /**
     * Verify if the crawler started
     * 
     * @returns {boolean} 
     * @memberof Crawler
     */
    public itStarted(): boolean 
    {
        return (!this.Stopped);
    }

    /**
     * Start the crawler
     * 
     * @memberof Crawler
     */
    public Start(): void 
    {
        this.Stopped = false;
        this.Crawl();
    }

    /**
     * Stop the crawler
     * 
     * @memberof Crawler
     */
    public Stop(): void 
    {
        this.Stopped = true;
    }
    /**
     * This function will be called at all HTTP request
     * Here we will send the message on Discord
     * 
     * @private
     * @memberof Crawler
     */
<<<<<<< HEAD
    private Interceptor(response?: CrawlerResponse): void 
    {
        if (typeof response !== "undefined")
        {
            this.Client.channels.get(this.Bot.ChannelID).send(this.FormatMessage(response));
        }
=======
    private Interceptor(response: CrawlerResponse | null): void 
    {
        if (response !== null)
        {
            this.Discord.sendMessage
            (
                {
                    to: this.Bot.ChannelID,
                    message: this.FormatMessage(response)
                }
            );
        }
    }

    private FormatMessage(data: CrawlerResponse): string
    {
        return data.message + ' (' + data.link + ')';
>>>>>>> master
    }

<<<<<<< HEAD
    private FormatMessage(data: CrawlerResponse): string
    {
        return '**' + data.message + '** (' + data.link + ')';
    }  
=======
export interface crawl
{
    crawl(callback?: (response: any) => void): void;
}

export interface CrawlerResponse
{
    message: string;
    link: string;
>>>>>>> master
}