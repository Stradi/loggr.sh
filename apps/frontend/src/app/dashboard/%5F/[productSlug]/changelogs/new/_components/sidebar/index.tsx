import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import CategorySettings from './category-settings';
import FeaturedImageSettings from './featured-image-settings';
import PermalinkSettings from './permalink-settings';
import PublishSettings from './publish-settings';

export default function Sidebar() {
  return (
    <aside className="border rounded-lg border-neutral-100 p-4 h-full overflow-y-scroll">
      <Accordion type="multiple">
        <AccordionItem value="publish-options">
          <AccordionTrigger>Publish Options</AccordionTrigger>
          <AccordionContent>
            <PublishSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="permalink">
          <AccordionTrigger>Permalink</AccordionTrigger>
          <AccordionContent>
            <PermalinkSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="categories">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <CategorySettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="featured-image">
          <AccordionTrigger>Featured Image</AccordionTrigger>
          <AccordionContent>
            <FeaturedImageSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
}
