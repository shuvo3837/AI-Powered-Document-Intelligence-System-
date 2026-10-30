// BullMQ Redis Background Consumer logic
export class DocumentProcessor {
  async processJob(job: any) {
    console.log(`Processing background document job: ${job.id}`);
    return { status: 'SUCCESS' };
  }
}
