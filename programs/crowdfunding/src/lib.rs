use anchor_lang::prelude::*;

declare_id!("G6BxLAjrE5aR3Lq17QtargspuJ1BF1Vph8RALQxqkpN2");

#[program]
pub mod crowdfunding {
    use super::*;

    pub fn create(ctx: Connect<Create>, name: String, description: String) -> Result<()> {
        let campaign = &mut ctx.account.campaign;
        campaign.name = name;
        campaign.description = description;
        campaign.amount_donated = 0;
        campaign.admin = *ctx.account.user.key;
        Ok(())
    }
}

